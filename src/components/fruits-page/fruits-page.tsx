import { FC, ReactNode, MouseEvent } from "react";

import LoadingSpinner from "../loading-spinner";
import ErrorPage from "../error-page";
import GroupPanel from "../group-panel";
import FruitsListComponent from "../fruit-list-component";
import JarComponent from "../jar-component";

import { SelectChangeEvent } from "@mui/material/Select";
import type {
  Group,
  ViewType,
  Fruit,
  FruitTableData,
  GroupedItem,
  JarData,
  JarChartItem,
} from "../../types";

type Props = {
  handleGroupSelect: (event: SelectChangeEvent) => void;
  handleToggleView: (event: MouseEvent<HTMLElement>) => void;
  handleFruitAdd: (id: number, jarId: string) => void;
  handleClearJar: () => void;
  handleFruitRemove: (id: number, jarId: string) => void;
  isLoading: boolean;
  errorMessage: string;
  groupList: Group[];
  selectedGroup: Group;
  viewType: ViewType;
  fruitList: Fruit[];
  fruitTableData: FruitTableData | null;
  groupedList: GroupedItem[] | null;
  jarData: JarData;
  jarChartList: JarChartItem[];
};

const FruitsPage: FC<Props> = ({
  handleGroupSelect,
  handleToggleView,
  handleFruitAdd,
  handleClearJar,
  handleFruitRemove,
  isLoading,
  errorMessage,
  groupList,
  selectedGroup,
  viewType,
  fruitList,
  fruitTableData,
  groupedList,
  jarData,
  jarChartList,
}): ReactNode => {
  return (
    <>
      {isLoading && !errorMessage && <LoadingSpinner />}

      {errorMessage && <ErrorPage errorMessage={errorMessage} />}

      {!isLoading && !errorMessage && (
        <>
          <GroupPanel
            handleGroupSelect={handleGroupSelect}
            groupList={groupList}
            selectedGroup={selectedGroup}
          />

          <FruitsListComponent
            handleToggleView={handleToggleView}
            handleFruitAdd={handleFruitAdd}
            viewType={viewType}
            fruitList={fruitList}
            fruitTableData={fruitTableData}
            groupKey={selectedGroup.key}
            groupedList={groupedList}
          />

          <JarComponent
            handleClearJar={handleClearJar}
            handleFruitRemove={handleFruitRemove}
            totalCalories={jarData.totalCalories}
            fruitList={jarData.list}
            jarChartList={jarChartList}
          />
        </>
      )}
    </>
  );
};

export default FruitsPage;
