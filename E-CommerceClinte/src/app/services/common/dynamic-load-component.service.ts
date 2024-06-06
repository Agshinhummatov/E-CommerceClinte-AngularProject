import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor() { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
    let _component: any = null;

    switch (component) {
      case ComponentType.BasketsComponent:
        _component = (await import('../../ui/components/baskets/baskets.component')).BasketsComponent;
        break;
    }

    if (_component) {
      viewContainerRef.clear();
      return viewContainerRef.createComponent(_component);
    } else {
      throw new Error('Component not found');
    }
  }
}

export enum ComponentType {
  BasketsComponent
}
