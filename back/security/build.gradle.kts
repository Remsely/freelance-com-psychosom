group = Constants.groupId
version = Constants.version

repositories {
    mavenCentral()
}

dependencies {
    implementation(project(Modules.domain))
    implementation(project(Modules.use_case))
    implementation(project(Modules.db))

    implementation(Libs.spring_boot_starter_security)
    implementation(Libs.spring_boot_starter_oauth2_resource_server)
    implementation(Libs.arrow_core)
}
