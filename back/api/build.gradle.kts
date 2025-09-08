plugins {
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

    implementation(libs.spring.boot.starter.web)
    implementation(libs.spring.boot.starter.webSocket)
    implementation(libs.springdoc.openapi.starter.webmvc.ui)

    implementation(libs.jackson.module.kotlin)

    implementation(libs.arrow.core)

    testImplementation(libs.spring.boot.starter.test)
    testImplementation(libs.kotlin.test.junit5)
    testImplementation(libs.kotest.assertions.arrow)
}
