import extensions.libs
import org.springframework.boot.gradle.tasks.bundling.BootJar

plugins {
    id("spring.library.convention")
}

apply(plugin = libs.plugins.spring.boot.get().pluginId)
apply(plugin = libs.plugins.spring.dependency.management.get().pluginId)

tasks.withType<BootJar> {
    mainClass.set("ru.remsely.psyhosom.app.PsyhosomApplication")
}

tasks.named<Jar>("jar") {
    enabled = false
}
