import { SetStateAction } from 'react';

import { Logger } from '@/framework/shared/logger';

import { QuestionnaireContentType } from './questionnaire';

abstract class EventBus {
  abstract getItem: (name: string) => QuestionnaireContentType | undefined
  abstract addItem: (item: QuestionnaireContentType) => void
  abstract removeItem: (name: string) => void
  abstract updateItem: (item: QuestionnaireContentType) => void
}

export class QEventBus implements EventBus {

  #_items = new Array<QuestionnaireContentType>()

  get items(): Array<QuestionnaireContentType> {
    return [...this.#_items];
  }

  set items(val: Array<QuestionnaireContentType>) {
    this.#_items = val;
  }

  getItem = (name: string) => this.#_items.find((v) => v.name === name)

  addItem = (item: QuestionnaireContentType) => {
    this.#_items = this.#_items.concat(item);
    this.#notify();
  }

  removeItem = (name: string) => {
    this.#_items = this.#_items.filter((v) => v.name !== name);
    this.#notify();
  }

  updateItem = ({ name, ...rest }: QuestionnaireContentType) => {
    const item = this.getItem(name);
    if (!item) {
      Logger.warn(`${name} not exists`);
      return;
    }
    delete item.value;
    Object.assign(item, { name, ...rest });
    this.#notify();
    return item;
  }

  replaceItemsWith = (items: Array<QuestionnaireContentType> = []): void => {
    this.items = items.concat();
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
    for (const anyFunc of this.#subscribers.values()) {
      try {
        requestAnimationFrame(() => anyFunc());
      } catch (ex) {
        Logger.error(ex);
      }
    }
    for (const setStateAction of this.#refreshers.values()) {
      requestAnimationFrame(() => setStateAction((value) => !value));
    }
  }
}
