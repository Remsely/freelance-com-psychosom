import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    alias(libs.plugins.kotlin.spring)
    alias(libs.plugins.spring.boot)
    alias(libs.plugins.spring.dependency.management)
    alias(libs.plugins.kotlin.jvm)
}

group = Project.groupId
version = Project.version

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(projects.domain)
    implementation(projects.useCase)
    implementation(projects.api)
    implementation(projects.db)
    implementation(projects.security)
    implementation(projects.telegram)
    implementation(projects.monitoring)
    implementation(projects.scheduled)
    implementation(projects.minio)

    implementation(libs.spring.boot.starter.web)
    implementation(libs.spring.boot.starter.data.jpa)
    implementation(libs.spring.boot.starter.webSocket)
    implementation(libs.springdoc.openapi.starter.webmvc.ui)

    implementation(libs.jackson.module.kotlin)
    implementation(libs.jetbrains.kotlin.reflect)

    testImplementation(libs.spring.boot.starter.test)
    testImplementation(libs.kotlin.test.junit5)
    testRuntimeOnly(libs.junit.platform.launcher)
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
