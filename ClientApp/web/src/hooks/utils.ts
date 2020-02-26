import { useContext, useState } from "react";

import QuestionnaireContext from "@/contexts/questionnaire";
import { QuestionnaireContentType } from "@/components/Questionnaire/questionnaire";

export function initQContext() {
  const [, reRender] = useState(false);

  const ctx = useContext(QuestionnaireContext);

  function getItem(name: string) {
    return ctx.items.find((item) => item.name === name);
  }

  function forceRender() {
    requestAnimationFrame(() => reRender((v) => !v));
  }

  function addItem(item: QuestionnaireContentType) {
    ctx.items.push(item);
    forceRender();
  }

  function removeItem(name: string) {
    ctx.items = ctx.items.filter((item) => item.name !== name);
    forceRender();
  }

  function updateItem({ name, ...rest }: QuestionnaireContentType) {
    for (const item of ctx.items) {
      if (item.name !== name) {
        continue;
      }
      delete item.value;
      Object.assign(item, { name, ...rest });
      break;
    }
    forceRender();
  }

  ctx.getItem = getItem;
  ctx.addItem = addItem;
  ctx.removeItem = removeItem;
  ctx.updateItem = updateItem;
  ctx.forceRender = forceRender;

  return ctx;
}
