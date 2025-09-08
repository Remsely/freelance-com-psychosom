import extensions.javaVersion
import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm")
    id("base.project.convention")
}

tasks {
    withType<KotlinCompile> {
        compilerOptions {
            freeCompilerArgs.add("-Xjvm-default=all-compatibility")
            jvmTarget.set(JvmTarget.fromTarget(javaVersion.toString()))
        }
    }

    withType<JavaCompile> {
        options.compilerArgs.add("-Xlint:all")
    }
}
