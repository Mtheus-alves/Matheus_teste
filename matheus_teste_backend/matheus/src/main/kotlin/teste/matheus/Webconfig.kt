package teste.matheus

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {

   override fun addCorsMappings(registry: CorsRegistry) {
         registry.addMapping("/**") 
             .allowedOrigins("http://localhost:4200","https://matheus-teste.vercel.app")
             .allowedMethods("GET", "POST", "PUT", "DELETE") 
             .allowedHeaders("*")  
             .allowCredentials(true) 
             .maxAge(3600)
     }
 }
}
