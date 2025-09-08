import org.springframework.boot.gradle.tasks.bundling.BootJar

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.spring)
    alias(libs.plugins.spring.boot)
    alias(libs.plugins.spring.dependency.management)
    alias(libs.plugins.kotlin.jpa)
    alias(libs.plugins.ksp)
}

group = Project.groupId
version = Project.version

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

configurations.all {
    resolutionStrategy {
        preferProjectModules()
    }
}

repositories {
    mavenCentral()
}

tasks.withType<BootJar> {
    mainClass.set(Project.main_class)
}
