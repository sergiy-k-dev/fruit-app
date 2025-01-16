import { FC, ReactNode } from "react";

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import FruitList from "../fruit-list";

import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import type { GroupedItem, GroupKey } from "../../types";

type Props = {
  handleFruitAdd: (id: number, jarId: string) => void;
  groupKey: GroupKey;
  groupedList: GroupedItem[];
};

const GroupedFruitList: FC<Props> = ({
  handleFruitAdd,
  groupKey,
  groupedList,
}): ReactNode => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={groupKey}
        id={groupKey}
        style={{ textTransform: "capitalize" }}
      >
        {groupKey}
      </AccordionSummary>

      <AccordionDetails>
        {groupedList.map(({ id, groupKeyValue, values }) => (
          <Accordion key={id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={groupKeyValue}
              id={groupKeyValue}
              style={{ textTransform: "capitalize" }}
            >
              {groupKeyValue}
            </AccordionSummary>

            <AccordionDetails>
              <FruitList
                handleFruitSelect={handleFruitAdd}
                fruitList={values}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default GroupedFruitList;
