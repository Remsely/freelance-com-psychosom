plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.8.0"
}

rootProject.name = "psychosom"

enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")

include(
    "domain",
    "db",
    "use-case",
    "api",
    "app",
    "security",
    "monitoring",
    "telegram",
    "scheduled",
    "minio"
)
