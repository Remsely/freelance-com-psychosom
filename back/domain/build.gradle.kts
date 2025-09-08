import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    alias(libs.plugins.ksp)
    alias(libs.plugins.kotlin.jvm)
}

group = Project.groupId
version = Project.version

repositories {
    mavenCentral()
}

dependencies {
    implementation(libs.arrow.core)
    implementation(libs.arrow.optics)
    ksp(libs.arrow.opticsKsp)

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
