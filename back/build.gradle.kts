plugins {
    // This prevents multiple loading of the Kotlin plugin during build-logic convention plugins compilation
    alias(libs.plugins.kotlin.jvm) apply false
}

group = "ru.remsely.psyhosom"
version = "0.0.1-SNAPSHOT"
