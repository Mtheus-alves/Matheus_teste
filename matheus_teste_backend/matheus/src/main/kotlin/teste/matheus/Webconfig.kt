package teste.matheus

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class CorsConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOriginPatterns("*")  // Permite qualquer origem
            .allowedMethods("*")  // Permite todos os métodos
            .allowedHeaders("*")  // Permite todos os headers
            .allowCredentials(true)
    }
}
