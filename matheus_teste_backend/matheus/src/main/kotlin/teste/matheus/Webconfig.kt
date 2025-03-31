package teste.matheus

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.EnableWebMvc

@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurer {

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**") 
            .allowedOrigins("https://matheus-teste.vercel.app, http://matheus-teste.vercel.app")
            .allowedMethods("GET", "POST", "PUT", "DELETE") 
            .allowedHeaders("*") 
            .allowCredentials(true) 
    }
}
