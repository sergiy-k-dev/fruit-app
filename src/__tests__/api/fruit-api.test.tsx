import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { FruitApi } from "../../api";
import type { Fruit } from "../../types";

describe("FruitApi", () => {
  let mock: InstanceType<typeof MockAdapter>;
  let fruitApi: FruitApi;

  beforeEach(() => {
    mock = new MockAdapter(axios);

    fruitApi = new FruitApi();
  });

  afterEach(() => {
    mock.reset();
  });

  describe("getAllFruits", () => {
    test("should return a list of fruits when API call is successful", async () => {
      // Mock API response for the 'getAllFruits' method
      const fruits: Fruit[] = [
        {
          id: 1,
          name: "Apple",
          family: "Rosaceae",
          genus: "sdf",
          order: "sdf",
          nutritions: {
            carbohydrates: 12,
            protein: 123,
            fat: 123,
            calories: 123,
            sugar: 123,
          },
        },
      ];

      mock.onGet("http://localhost:3000/api/fruit/all").reply(200, fruits);

      const result = await fruitApi.getAllFruits();

      expect(result?.data).toEqual(fruits);
    });

    test("should throw an error when API call fails", async () => {
      mock.onGet("http://localhost:3000/api/fruit/all").reply(500);

      await expect(fruitApi.getAllFruits()).rejects.toThrow(
        "Request failed with status code 500"
      );
    });
  });

    describe("getFruitsByFamily", () => {
      test("should return a list of fruits by family when API call is successful", async () => {
        const fruitsByFamily: Fruit[] = [
          {
            id: 1,
            name: "Apple",
            family: "Rosaceae",
            genus: "sdf",
            order: "sdf",
            nutritions: {
              carbohydrates: 12,
              protein: 123,
              fat: 123,
              calories: 123,
              sugar: 123,
            },
          },
        ];

        mock
          .onGet("http://localhost:3000/api/fruit/family", {
            params: { family: "Rosaceae" },
          })
          .reply(200, fruitsByFamily);

        const result = await fruitApi.getFruitsByFamily("Rosaceae");
        expect(result?.data).toEqual(fruitsByFamily); // Expect the result to match the mocked fruitsByFamily
      });

      test("should throw an error when API call fails", async () => {
        // Mock a failed API response for family search
        mock
          .onGet("http://localhost:3000/api/fruit/family", {
            params: { family: "Rosaceae" },
          })
          .reply(404);

        await expect(fruitApi.getFruitsByFamily("Rosaceae")).rejects.toThrow(
          "Request failed with status code 404"
        );
      });
    });
});
