import { SetStateAction } from "react";

import { QuestionnaireContentType } from "./questionnaire";

interface EventBus {
  getItem: (name: string) => QuestionnaireContentType | undefined
  addItem: (item: QuestionnaireContentType) => void
  removeItem: (name: string) => void
  updateItem: (item: QuestionnaireContentType) => void
}

export class QEventBus implements EventBus {

  items: Array<QuestionnaireContentType> = []

  getItem = (name: string) => this.items.find((item) => item.name === name)

  addItem = (item: QuestionnaireContentType) => {
    this.items = this.items.concat(item);
    this.#notify();
  }

  removeItem = (name: string) => {
    this.items = this.items.filter((item) => item.name !== name);
    this.#notify();
  }

  updateItem = ({ name, ...rest }: QuestionnaireContentType) => {
    for (const item of this.items) {
      if (item.name !== name) {
        continue;
      }
      delete item.value;
      Object.assign(item, { name, ...rest });
      break;
    }
    this.items = this.items.concat();
    this.#notify();
  }

  replaceItemsWith = (items: Array<QuestionnaireContentType> = []): void => {
    this.items = items;
  }

  #subscribers = new Set<Function>()

  subscribe = (fn: Function): void => {
    this.#subscribers.add(fn);
  }

  unsubscribe = (fn: Function): void => {
    this.#subscribers.delete(fn);
  }

  clearListeners = (): void => {
    this.#subscribers.clear();
  }

  #refreshers = new Set<React.Dispatch<SetStateAction<boolean>>>()

  addRefresher = (fn: React.Dispatch<SetStateAction<boolean>>): void => {
    this.#refreshers.add(fn);
  }

  removeRefresher = (fn: React.Dispatch<SetStateAction<boolean>>): void => {
    this.#refreshers.delete(fn);
  }

  clearRefreshers = (): void => {
    this.#refreshers.clear();
  }

  #notify = (): void => {
    for (const anyFunc of this.#subscribers) {
      try {
        requestAnimationFrame(() => anyFunc());
      } catch {
        //
      }
    }
    for (const setStateAction of this.#refreshers) {
      requestAnimationFrame(() => setStateAction((value) => !value));
    }
  }
}
