plugins {
    `kotlin-dsl`
}

repositories {
    gradlePluginPortal()
    mavenCentral()
}

dependencies {
    implementation(libs.gradle.plugins.kotlin.jvm)
    implementation(libs.gradle.plugins.kotlin.spring)
    implementation(libs.gradle.plugins.spring.boot)
    implementation(libs.gradle.plugins.spring.dependency.management)

    /* Workaround for version catalog working inside precompiled scripts
    Issue - https://github.com/gradle/gradle/issues/15383 */
    implementation(files(libs.javaClass.superclass.protectionDomain.codeSource.location))
}
