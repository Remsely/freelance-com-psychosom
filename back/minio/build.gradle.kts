import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    alias(libs.plugins.java)
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

    implementation(libs.spring.boot.starter)

    implementation(libs.arrow.core)

    implementation(libs.amazon.awsSdk.s3)
}

tasks.test {
    useJUnitPlatform()
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
