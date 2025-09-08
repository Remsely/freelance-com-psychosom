import org.springframework.boot.gradle.tasks.bundling.BootJar

plugins {
    id("org.springframework.boot")
    id("io.spring.dependency-management")
    id("spring.library.convention")
}

tasks.withType<BootJar> {
    mainClass.set("ru.remsely.psyhosom.app.PsyhosomApplication")
}

tasks.named<Jar>("jar") {
    enabled = false
}
