package com.contextflow.service;

import org.springframework.stereotype.Service;

@Service
public class CosineSimilarityService {

    public double calculate(float[] vectorA, float[] vectorB) {

        double dotProduct = 0;
        double magnitudeA = 0;
        double magnitudeB = 0;

        for (int i = 0; i < vectorA.length; i++) {

            dotProduct += vectorA[i] * vectorB[i];

            magnitudeA += vectorA[i] * vectorA[i];

            magnitudeB += vectorB[i] * vectorB[i];
        }

        magnitudeA = Math.sqrt(magnitudeA);
        magnitudeB = Math.sqrt(magnitudeB);

        if (magnitudeA == 0 || magnitudeB == 0) {
            return 0;
        }

        return dotProduct / (magnitudeA * magnitudeB);
    }
    
    public float[] stringToVector(String embedding) {

        String[] values = embedding.split(",");

        float[] vector = new float[values.length];

        for (int i = 0; i < values.length; i++) {
            vector[i] = Float.parseFloat(values[i]);
        }

        return vector;
    }
    
}
