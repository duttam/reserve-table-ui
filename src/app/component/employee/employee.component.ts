import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from 'src/app/domain/employee';
import {Subscription} from 'rxjs';
import {Message} from 'primeng/components/common/api';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    form;

  
  employees: Employee[];
    selectedEmployee: Employee;
    employeeForDialog: Employee;
    displayDialog: boolean;
    msgs: Message[] = [];

    get$: Subscription;
    add$: Subscription;
    edit$: Subscription;
    delete$: Subscription;

    constructor(private employeeService: EmployeeService,private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(){
        this.form = new FormGroup({
            firstName:new FormControl(),
            lastName: new FormControl(),
            profession:new FormControl(),
            department: new FormControl()

        });
        this.get$ = this.employeeService.getEmployees().subscribe(
            employees => this.employees = employees,
            error => this.showError(error)
        );
       
    }

    // ngOnDestroy() {
    //     this.get$.unsubscribe();
    //     this.add$.unsubscribe();
    //     this.edit$.unsubscribe();
    //     this.delete$.unsubscribe();
    // }

    add() {
        // create an empty employee
        this.employeeForDialog = {
            id: null, firstName: null, lastName: null, profession: null, department: null
        };
        
        this.displayDialog = true;

    }

    edit(employee) {
        this.selectedEmployee=employee;
        console.log(this.selectedEmployee);
        // create a clone of the selected employee
        this.employeeForDialog = Object.assign({}, this.selectedEmployee);
        console.log(this.employeeForDialog);
        
        this.form=new FormGroup({
            firstName:new FormControl(this.selectedEmployee.firstName),
            lastName: new FormControl(this.selectedEmployee.lastName),
            profession:new FormControl(this.selectedEmployee.profession),
            department: new FormControl(this.selectedEmployee.department)
        })
        this.displayDialog = true;
        let values=this.form.value;
        let payload= {
            id:values.id,
            firstName:values.firstName,
            lastName:values.lastName,
            profession: values.profession,
            department: values.department
        }
        // this.employeeService.updateEmployee(payload).subscribe((response)=>{
        //     console.log(response.data);
        //     this.displayDialog=false;
        // })
    }

    remove() {
        if (this.selectedEmployee == null) {
            return;
        }

        // this.delete$ = this.employeeService.deleteEmployee(this.selectedEmployee.id)
        //     .finally(() => {
        //         this.employeeForDialog = null;
        //         this.selectedEmployee = null;
        //     })
        //     .subscribe(
        //         () => {
        //             this.employees = this.employees.filter(
        //                 (element: Employee) => element.id !== this.selectedEmployee.id);
        //             this.showSuccess('Employee was successfully removed');
        //         },
        //         error => this.showError(error)
        //     );
    }

    save(form: NgForm) {
        if (this.employeeForDialog.id) {
            let values=form.value;
            let payload= {
                id:this.selectedEmployee.id,
                firstName:values.firstName,
                lastName:values.lastName,
                profession: values.profession,
                department: values.department
            }
            console.log(payload);
             this.employeeService.updateEmployee(payload)
               
                .subscribe(
                    () => {
                        this.displayDialog=false;
                        this.employees.some((element: Employee, index: number) => {
                            if (element.id === this.employeeForDialog.id) {
                                this.employees[index] = Object.assign({}, this.employeeForDialog);
                                this.employees = [...this.employees];
                                this.selectedEmployee = this.employees[index];
                                return true;
                            }
                        });
                        this.showSuccess('Employee was successfully updated');
                    },
                   
                    error => this.showError(error)
                );
        } else {
            // create
            this.add$ = this.employeeService.createEmployee(this.employeeForDialog)
               
                .subscribe(
                    (employee: Employee) => {
                        this.employees = [...this.employees, employee];
                        console.log(employee);
                        this.showSuccess('Employee was successfully created');
                    },
                    error => this.showError(error)
                );
        }
    }

    private showError(errMsg: string) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Sorry, an error occurred', detail: errMsg});
    }

    private showSuccess(successMsg: string) {
        this.msgs = [];
        this.msgs.push({severity: 'success', detail: successMsg});
    }

}
