package ru.remsely.psihosom.app

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication(scanBasePackages = ["ru.remsely.psihosom.*"])
class PsihosomApplication

fun main(args: Array<String>) {
    runApplication<PsihosomApplication>(*args)
}
