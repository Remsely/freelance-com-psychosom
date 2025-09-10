import extensions.javaVersion
import extensions.libs
import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("base.project.convention")
}

apply(plugin = libs.plugins.kotlin.jvm.get().pluginId)

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
