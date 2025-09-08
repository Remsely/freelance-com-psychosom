plugins {
    id("spring.application.convention")
    id("testing.commons.convention")
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
