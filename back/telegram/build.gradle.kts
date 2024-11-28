plugins {
    kotlin("jvm")
}

group = "ru.remsely.psyhosom.telegram"
version = "0.0.1-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(project(Modules.domain))
    implementation(project(Modules.use_case))

    implementation(Libs.spring_boot_starter)

    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(21)
}
