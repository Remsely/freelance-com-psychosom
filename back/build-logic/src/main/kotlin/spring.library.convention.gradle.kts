import extensions.libs

plugins {
    id("kotlin.library.convention")
}

apply(plugin = libs.plugins.kotlin.spring.get().pluginId)
