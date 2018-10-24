Vue.component('alert-component',{
	props:['select_obj' ],
	template:`
		<div  class="modal"   style="display:block;" id="exampleModalCenter" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div style="position: absolute;width: 100%;height: 100%;background-color: #000;opacity: 0.8;"></div>
        
        <div class="modal-dialog modal-dialog-centered" role="document"> 
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">{{select_obj.serial}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="$emit('cancel-order-view')" >
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">purpose</div>
                        <div class="col-8">{{select_obj.tpurpose}}</div>
                    </div>
                    <div class="row">
                        <div class="col">amount</div>
                        <div class="col-8">$ {{select_obj.amount}}</div>
                    </div>
                    <div class="row">
                        <div class="col">status</div>
                        <div class="col-8">
                            {{select_obj.status_label}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">expire_at</div>
                        <div class="col-8">{{select_obj.expire_at}}</div>
                    </div>
                    <div class="row">
                            <div class="col">description</div>
                            <div class="col-8">{{select_obj.description}}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" v-on:click="$emit('check-order',select_obj)"   >確認投資</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="$emit('cancel-order-view')">取消</button>
                </div>
            </div>

        </div>
    </div>`

});