import {
  FC,
  ReactNode,
  useMemo,
  useCallback,
  useState,
  useContext,
  useEffect,
  MouseEvent,
} from "react";
import { v4 as uuidv4 } from "uuid";

import FruitsPage from "../../fruits-page";

import { FruitApiContext } from "../../../contexts";

import { AxiosResponse, AxiosError } from "axios";
import { SelectChangeEvent } from "@mui/material/Select";
import type {
  Fruit,
  JarData,
  Group,
  GroupKey,
  GroupedItem,
  ViewType,
  FruitTableData,
  TableHeader,
  TableRow,
  JarChartItem,
} from "../../../types";

const FruitsPageContainer: FC = (): ReactNode => {
  const defaultGroupList: Group[] = useMemo(
    () => [
      {
        id: 1,
        key: "none",
        name: "None",
      },
      {
        id: 2,
        key: "family",
        name: "Family",
      },
      {
        id: 3,
        key: "order",
        name: "Order",
      },
      {
        id: 4,
        key: "genus",
        name: "Genus",
      },
    ],
    []
  );
  const defaultFruitList: Fruit[] = useMemo(() => [], []);
  const defaultViewType: ViewType = useMemo(() => "list", []);
  const defaultJarData: JarData = useMemo(
    () => ({
      totalCalories: 0,
      list: [],
    }),
    []
  );
  const defaultChartList: JarChartItem[] = useMemo(
    () => [{ name: "No Items Selected", value: 0 }],
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [groupList] = useState<Group[]>(defaultGroupList);
  const [selectedGroup, setSelectedGroup] = useState<Group>(
    defaultGroupList[0]
  );
  const [viewType, setViewType] = useState<ViewType>(defaultViewType);
  const [fruitList, setFruitList] = useState<Fruit[]>(defaultFruitList);
  const [fruitTableData, setFruitTableData] = useState<FruitTableData | null>(
    null
  );
  const [groupedList, setGroupedList] = useState<GroupedItem[] | null>(null);
  const [jarData, setJarData] = useState<JarData>(defaultJarData);
  const [jarChartList, setJarChartList] =
    useState<JarChartItem[]>(defaultChartList);

  const fruitApi = useContext(FruitApiContext);

  const getFruitList = useCallback(async (): Promise<void> => {
    try {
      const fruitListData: AxiosResponse<Fruit[], any> | undefined =
        await fruitApi.getAllFruits();

      if (Array.isArray(fruitListData?.data)) {
        setFruitList(fruitListData?.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        setIsLoading(false);

        setErrorMessage(`${error.code} - ${error.message}`);
      }

      if (error instanceof Error) {
        setIsLoading(false);

        setErrorMessage(error.message);
      }
    }
  }, []);

  useEffect(() => {
    getFruitList();
  }, [getFruitList]);

  const getTableData = (): FruitTableData => {
    const headerList: TableHeader[] = [
      {
        align: "left",
        name: "Fruit name",
      },
      {
        align: "right",
        name: "Family",
      },
      {
        align: "right",
        name: "Order",
      },
      {
        align: "right",
        name: "Genus",
      },
      {
        align: "right",
        name: "Calories",
      },
    ];

    const rowList: TableRow[] = fruitList.map(
      ({ name, family, order, genus, nutritions: { calories } }) => [
        name,
        family,
        order,
        genus,
        calories,
      ]
    );

    return {
      headerList,
      rowList,
    };
  };

  useEffect(() => {
    if (viewType === "table" && !fruitTableData) {
      const tableData = getTableData();

      setFruitTableData(tableData);
    }
  }, [viewType]);

  const getGroupedCollections = (groupKey: GroupKey): void => {
    if (groupKey === "none") {
      setGroupedList(null);

      return;
    }

    // 1 find unigue group key values
    const groupKeyValues: Map<number, string> = new Map();

    fruitList.forEach((item, index) => {
      groupKeyValues.set(index, item[groupKey]);
    });

    const unigueGroupValues: Set<string> = new Set(groupKeyValues.values());

    // 2 sort unigue values
    const groupValues = [];

    for (const value of unigueGroupValues) {
      groupValues.push(value);
    }

    groupValues.sort((a, b) => {
      const x = a.toLowerCase().trim();
      const y = b.toLowerCase().trim();

      if (x < y) {
        return -1;
      }

      if (x > y) {
        return 1;
      }

      return 0;
    });

    // 3 find items related to unigue value and add them to result array
    const newGroupedList = groupValues.map((groupKeyValue, index) => {
      const result = fruitList.filter(
        (item) => item[groupKey] === groupKeyValue
      );

      return {
        id: index,
        groupKeyValue,
        values: result,
      };
    });

    setGroupedList(newGroupedList);
  };

  const handleGroupSelect = (event: SelectChangeEvent): void => {
    const groupKey: GroupKey = event.target.value as GroupKey;

    const newSelectedGroup: Group | undefined = groupList.find(
      ({ key }) => key === groupKey
    );

    if (newSelectedGroup && newSelectedGroup.id !== selectedGroup.id) {
      setSelectedGroup(newSelectedGroup);

      getGroupedCollections(groupKey);
    }
  };

  const handleToggleView = (event: MouseEvent<HTMLElement>): void => {
    const value = (event.target as HTMLButtonElement).value;

    if ((value === "list" || value === "table") && viewType !== value) {
      setViewType(value);
    }
  };

  const getTotalCalories = (fruitList: Fruit[]): number =>
    fruitList.reduce((acc, item) => acc + item.nutritions.calories, 0);

  const getChartList = (fruitList: Fruit[] | undefined): void => {
    if (!fruitList) {
      setJarChartList(defaultChartList);

      return;
    }

    const chartDataMap: Map<string, number> = new Map();

    fruitList.forEach(({ name, nutritions: { calories } }) => {
      const value = chartDataMap.get(name);

      if (!value) {
        chartDataMap.set(name, calories);

        return;
      }

      chartDataMap.set(name, value + calories);
    });

    const jarChartList: JarChartItem[] = [];

    chartDataMap.forEach((value, key) => {
      jarChartList.push({
        name: key,
        value,
      });
    });

    setJarChartList(jarChartList);
  };

  const handleFruitAdd = (id: number): void => {
    const fruitIndex = fruitList.findIndex(({ id: fruitId }) => fruitId === id);

    if (fruitIndex === -1) {
      return;
    }

    const list: Fruit[] = JSON.parse(JSON.stringify(jarData.list));
    const fruitToAdd: Fruit = JSON.parse(JSON.stringify(fruitList[fruitIndex]));

    fruitToAdd["jarId"] = uuidv4();

    list.push(fruitToAdd);

    const totalCalories = getTotalCalories(list);

    getChartList(list);

    setJarData({
      totalCalories,
      list,
    });
  };

  const handleFruitRemove = (id: number, jarId: string): void => {
    const fruitIndex = jarData.list.findIndex(
      ({ id: fruitId, jarId: fruitJarId }) =>
        fruitJarId === jarId && fruitId === id
    );

    if (fruitIndex === -1) {
      return;
    }

    const list: Fruit[] = JSON.parse(JSON.stringify(jarData.list));

    list.splice(fruitIndex, 1);

    const totalCalories = getTotalCalories(list);

    getChartList(list);

    setJarData({
      totalCalories,
      list,
    });
  };

  const handleClearJar = (): void => {
    getChartList(undefined);

    setJarData(defaultJarData);
  };

  return (
    <FruitsPage
      handleGroupSelect={handleGroupSelect}
      handleToggleView={handleToggleView}
      handleFruitAdd={handleFruitAdd}
      handleClearJar={handleClearJar}
      handleFruitRemove={handleFruitRemove}
      isLoading={isLoading}
      errorMessage={errorMessage}
      groupList={groupList}
      selectedGroup={selectedGroup}
      viewType={viewType}
      fruitList={fruitList}
      fruitTableData={fruitTableData}
      groupedList={groupedList}
      jarData={jarData}
      jarChartList={jarChartList}
    />
  );
};

export default FruitsPageContainer;
