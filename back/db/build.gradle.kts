import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    alias(libs.plugins.kotlin.jpa)
    alias(libs.plugins.flyway)
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.spring)
}

group = Project.groupId
version = Project.version

repositories {
    mavenCentral()
}

dependencies {
    implementation(projects.domain)
    implementation(projects.useCase)
    implementation(projects.monitoring)

    implementation(libs.spring.boot.starter.data.jpa)

    implementation(libs.arrow.core)

    implementation(libs.postgresql)
    implementation(libs.flyway.core)
    implementation(libs.flyway.database.postgresql)

    implementation(libs.jetbrains.kotlin.reflect)

    testImplementation(libs.spring.boot.starter.test)
    testImplementation(libs.kotlin.test.junit5)
    testImplementation(libs.kotest.assertions.arrow)
}

tasks {
    withType<KotlinCompile> {
        compilerOptions {
            freeCompilerArgs = listOf("-Xjvm-default=all-compatibility")
            jvmTarget.set(JvmTarget.JVM_21)
        }
    }

    withType<JavaCompile> {
        options.compilerArgs.add("-Xlint:all")
    }

    withType<Test> {
        useJUnitPlatform()
    }
}
