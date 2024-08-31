plugins {
    id(Plugins.kotlin_jpa) version PluginVersions.kotlin_jpa
}

group = Constants.groupId
version = Constants.version

repositories {
    mavenCentral()
}

dependencies {
    implementation(project(Modules.domain))
    implementation(project(Modules.use_case))

    implementation(Libs.spring_boot_starter_data_jpa)

    implementation(Libs.arrow_core)
    implementation(Libs.postgresql)

    implementation(Libs.jetbrains_kotlin_reflect)

    testImplementation(Libs.spring_boot_starter_test)
    testImplementation(Libs.kotlin_test_junit5)
    testImplementation(Libs.kotest_assertions_arrow)
}
