rootProject.name = "psychosom"

enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")

includeBuild("build-logic")

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
