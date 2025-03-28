group = Project.groupId
version = Project.version

repositories {
    mavenCentral()
}

dependencies {
    implementation(project(Modules.domain))
    implementation(project(Modules.monitoring))

    implementation(Libs.spring_boot_starter)
    implementation(Libs.spring_tx)
    implementation(Libs.arrow_core)

    testImplementation(Libs.kotlin_test_junit5)
    testImplementation(Libs.spring_boot_starter_test)
    testImplementation(Libs.kotest_assertions_arrow)
}
