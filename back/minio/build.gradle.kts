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
    implementation(project(Modules.domain))
    implementation(project(Modules.use_case))
    implementation(project(Modules.monitoring))

    implementation(libs.spring.boot.starter)

    implementation(libs.arrow.core)

    implementation(libs.amazon.awsSdk.s3)
}

tasks.test {
    useJUnitPlatform()
}
