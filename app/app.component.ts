import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component } from '@angular/core';
import { TreeItemLookup } from '@progress/kendo-angular-treeview';

@Component({
  selector: 'my-app',
  template: `
    <kendo-treeview
      id="kendoTree"
      [nodes]="data"
      textField="text"
      kendoTreeViewExpandable
      kendoTreeViewHierarchyBinding
      childrenField="items"
    >
      <ng-template
        kendoTreeViewNodeTemplate
        let-node
        let-dataItem
        let-index="index"
      >
        <input
          [ngClass]="{
            'k-radio': dataItem.IsMutual,
            'k-checkbox': !dataItem.IsMutual
          }"
          *ngIf="show(index)"
          type="checkbox"
          (change)="onChange($event, index, node)"
          [checked]="isChecked(index)"
        />
        {{ dataItem.text }}
      </ng-template>
    </kendo-treeview>
    <div style="margin: 10px 0">
      <div class="example-config">Checked items: {{ checkedItems }}</div>
    </div>
  `
})
export class AppComponent {
  public data: any[] = [
    {
      text: 'All Tags',
      IsMutual: true,
      IsGroup: true,
      items: [
        { text: 'Reponsive', IsMutual: true, IsGroup: false },
        { text: 'Non-Responsive', IsMutual: true, IsGroup: false },
        { text: 'Hot-Doc', IsMutual: true, IsGroup: false },
        {
          text: 'Relevant',
          IsGroup: true,
          IsMutual: true,
          items: [
            { text: 'Tag 1', IsMutual: true, IsGroup: false },
            { text: 'Tag 2', IsMutual: true, IsGroup: false },
            { text: 'Tag 3', IsMutual: true, IsGroup: false }
          ]
        }
      ]
    },
    {
      text: 'All Tags Second',
      IsMutual: false,
      IsGroup: true,
      items: [
        { text: 'Reponsive', IsMutual: false, IsGroup: false },
        { text: 'Non-Responsive', IsMutual: false, IsGroup: false },
        { text: 'Hot-Doc', IsMutual: false, IsGroup: false },
        {
          text: 'Relevant',
          IsGroup: true,
          IsMutual: false,
          items: [
            { text: 'Tag 1', IsMutual: false, IsGroup: false },
            { text: 'Tag 2', IsMutual: false, IsGroup: false },
            { text: 'Tag 3', IsMutual: false, IsGroup: false }
          ]
        }
      ]
    },
    { text: 'Tag 4', IsGroup: false, IsMutual: false },
    { text: 'Tag 5', IsGroup: false, IsMutual: false }
  ];

  public checkedItems: Array<String> = [];

  public show(index: String): boolean {
    if (index.indexOf('_') >= 0) {
      return true;
    } else {
      return false;
    }
  }

  public onChange(event: Event, index: String, node: any): void {
    //patch
    if (node.IsMutual) {
      //0_1
      //console.log(index);
      var parentID = '0';
      for (var i = index.length - 1; i >= 0; i--) {
        console.log('Char' + index[i]);
        if (index[i] === '_') {
          parentID = index.substr(0, i);
          break;
        }
      }

      console.log(parentID);

      var item = this.checkedItems.filter(
        i => i.split('_')[0] == index.split('_')[0]
      );

      item.forEach(x => {
        this.checkedItems.splice(this.checkedItems.indexOf(x), 1);
      });
      console.log(item);
    }
    const isItemChecked = this.checkedItems.indexOf(index) >= 0;
    if ((event.target as HTMLInputElement).checked && !isItemChecked) {
      this.checkedItems = [...this.checkedItems, index];
    }

    if (!(event.target as HTMLInputElement).checked && isItemChecked) {
      this.checkedItems = this.checkedItems.filter(i => i !== index);
    }
  }

  public isChecked(index: String): boolean {
    if (this.checkedItems.indexOf(index) >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
