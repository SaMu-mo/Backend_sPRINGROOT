package com.krakedev.jwt.controllers;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.krakedev.jwt.entidades.Usuario;
import com.krakedev.jwt.services.UsuarioService;
import com.krakedev.jwt.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        Usuario guardado = usuarioService.registrar(usuario);
        return ResponseEntity.ok(guardado);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Optional<Usuario> resultado = usuarioService.login(usuario.getUsername(), usuario.getPassword());
        if (resultado.isPresent()) {
            String token = JwtUtil.generarToken(resultado.get().getUsername(), resultado.get().getRol());
            Map<String, String> respuesta = new HashMap<>();
            respuesta.put("token", token);
            respuesta.put("username", resultado.get().getUsername());
            respuesta.put("rol", resultado.get().getRol());
            return ResponseEntity.ok(respuesta);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }

    @GetMapping("/perfil")
    public ResponseEntity<?> perfil(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token no proporcionado");
        }
        String token = authHeader.substring(7);
        try {
            DecodedJWT decoded = JwtUtil.verificarToken(token);
            String username = decoded.getSubject();
            String rol = decoded.getClaim("rol").asString();
            String mensaje = "ADMIN".equals(rol)
                    ? "Bienvenido Voluntario " + username + " - Tienes acceso administrativo al refugio"
                    : "Bienvenido Adoptante " + username + " - Puedes ver las mascotas disponibles";
            Map<String, String> respuesta = new HashMap<>();
            respuesta.put("mensaje", mensaje);
            respuesta.put("username", username);
            respuesta.put("rol", rol);
            return ResponseEntity.ok(respuesta);
        } catch (JWTVerificationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido o expirado");
        }
    }
}