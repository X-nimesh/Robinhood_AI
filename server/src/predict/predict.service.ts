import { Injectable } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import fetch from 'node-fetch';
import * as fs from 'fs';
// Set the global fetch implementation for TensorFlow.js

@Injectable()
export class PredictService {
  //   constructor() {}
  getTrainingData(): { features: number[][]; labels: number[] } {
    // Generate dummy training data
    const numSamples = 100;
    const numFeatures = 4;
    const features: number[][] = [];
    const labels: number[] = [];

    for (let i = 0; i < numSamples; i++) {
      const featureRow: number[] = [];
      for (let j = 0; j < numFeatures; j++) {
        featureRow.push(Math.random()); // Generate random feature values between 0 and 1
      }
      features.push(featureRow);
      labels.push(Math.random()); // Generate a random label value between 0 and 1
    }

    return { features, labels };
  }
  async trainModel(): Promise<void> {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({ units: 10, inputShape: [4], activation: 'relu' }),
    );
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

    // Prepare your training data
    const { features, labels } = this.getTrainingData(); // Replace with your actual training data

    const xs = tf.tensor2d(features, [features.length, features[0].length]);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    // Train the model
    await model.fit(xs, ys, {
      epochs: 10,
      batchSize: 32,
    });

    // Save the trained model
    // await model.save('/train');
  }

  async predictStockPrice(input: number[]): Promise<number> {
    // Load the trained model
    // const model = await tf.loadLayersModel('file://path/to/model.json');
    const modelJson = fs.readFileSync('path/to/model.json', 'utf8');
    const model = await tf.loadLayersModel(tf.io.fromMemory(modelJson));

    // Preprocess the input data
    const inputData = tf.tensor2d(input, [1, input.length]);

    // Perform the prediction
    const prediction = model.predict(inputData) as tf.Tensor<tf.Rank.R2>;
    const price = (await prediction.data())[0];

    // Clean up the tensors
    inputData.dispose();
    prediction.dispose();

    return price;
  }
}
