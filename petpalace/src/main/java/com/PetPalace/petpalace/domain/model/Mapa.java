package com.PetPalace.petpalace.domain.model;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

    public class Mapa {

        // Cliente HTTP
        private static final OkHttpClient client = new OkHttpClient();

        // Conversor JSON
        private static final ObjectMapper mapper = new ObjectMapper();

        public static void main(String[] args) throws Exception {
            String endereco1 = "Avenida Paulista, São Paulo";
            String endereco2 = "Praça da Sé, São Paulo";

            double[] coords1 = getCoordenadas(endereco1);
            double[] coords2 = getCoordenadas(endereco2);

            if (coords1 != null && coords2 != null) {
                double distanciaKm = calcularDistancia(coords1[0], coords1[1], coords2[0], coords2[1]);
                System.out.printf("Distância entre %s e %s: %.2f km%n", endereco1, endereco2, distanciaKm);
            }
        }

        // Busca latitude e longitude no Nominatim
        public static double[] getCoordenadas(String endereco) throws Exception {
            String url = "https://nominatim.openstreetmap.org/search?q="
                    + endereco.replace(" ", "+")
                    + "&format=json&limit=1";

            Request request = new Request.Builder()
                    .url(url)
                    .header("User-Agent", "Mozilla/5.0 (TCC Projeto)")
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (response.isSuccessful()) {
                    String json = response.body().string();
                    JsonNode arr = mapper.readTree(json);

                    if (arr.isArray() && arr.size() > 0) {
                        double lat = arr.get(0).get("lat").asDouble();
                        double lon = arr.get(0).get("lon").asDouble();
                        System.out.printf("Endereço '%s' → Lat: %.6f, Lon: %.6f%n", endereco, lat, lon);
                        return new double[]{lat, lon};
                    }
                }
            }
            System.out.println("Não foi possível obter coordenadas para: " + endereco);
            return null;
        }

        // Fórmula de Haversine para calcular distância
        public static double calcularDistancia(double lat1, double lon1, double lat2, double lon2) {
            final int R = 6371; // Raio da Terra em km
            double dLat = Math.toRadians(lat2 - lat1);
            double dLon = Math.toRadians(lon2 - lon1);
            double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Retorna em km
        }
    }
