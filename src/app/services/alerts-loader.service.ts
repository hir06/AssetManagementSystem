import { HttpActionDirective } from "./../directive/http-action.directive";
import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    ApplicationRef
} from "@angular/core";
import { AjaxLoaderComponent } from "../components/ajax-loader/ajax-loader.component";

@Injectable()
export class AlertsLoaderService {
    public httpActionIndicator: HttpActionDirective;
    public componentRef: any;
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    showLoader(){
       let componentFactory = this.componentFactoryResolver.resolveComponentFactory(AjaxLoaderComponent);
       let viewContainerRef = this.httpActionIndicator.viewContainerRef;
       viewContainerRef.clear();
       this.componentRef = viewContainerRef.createComponent(componentFactory);
    }
    hideLoader(){
           this.componentRef.destroy();
    }
}
