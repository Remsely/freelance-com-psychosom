import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

group = Project.groupId
version = Project.version

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.spring)
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(projects.domain)
    implementation(projects.monitoring)

    implementation(libs.spring.boot.starter)
    implementation(libs.spring.tx)
    implementation(libs.arrow.core)

    testImplementation(libs.kotlin.test.junit5)
    testImplementation(libs.spring.boot.starter.test)
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
