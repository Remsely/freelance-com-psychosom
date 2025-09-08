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
    implementation(projects.useCase)
    implementation(projects.monitoring)

    implementation(libs.arrow.core)
    implementation(libs.spring.boot.starter)
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(21)
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
