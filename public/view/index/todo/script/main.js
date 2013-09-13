
include
    
    .routes({
        atma_compo: '/.reference/atma/compos/{0}/lib/{1}.js',
        bootstrap: '/.reference/bootstrap/js/{0}.js'
    })
    
    .js(
        'compo/dropdown.js',
        'compo/tooltip.js',
        'model.js',
        'viewer/viewer.js',
        'editor/editor.js'
    )
    .js({
        atma_compo: ['scroller', 'tabs'],
    })
    
    .done(function(){
        
        var tasks = TaskCollection.fetch();
        
        var App = Compo({
            template: '#app-layout',
            compos: {
                pages: 'compo: #pages',
                editor: 'compo: :task:editor'
            },
            slots: {
                taskCreate: function(){
                   this.edit(new Task);
                },
                taskEdit: function(event, task){
                    this.edit(task);
                },
                taskSave: function(event, task){
                    if (tasks.indexOf(task) === -1) 
                        tasks.push(task);
                    
                    tasks.save();
                    
                    this.showView('viewer');
                },
                taskRemove: function(event){
                    var task = $(event.currentTarget).model();
                    tasks.remove(task);
                    tasks.save();
                },
                abortEdit: function(){
                    this.showView('viewer');
                }
            },
            
            edit: function(task){
                 this
                    .compos
                    .editor
                    .edit(task);
                    
                this.showView('editor');
            },
            showView: function(view){
                this
                    .compos
                    .pages
                    .setActive(view);
            }
        });
        
        if (tasks.length === 0) {
            // default tasks, when localStorage is empty
            tasks
                .push({
                    title: 'Learn ClassJS',
                    time: 15,
                    complete: 20,
                }, {
                    title: 'Get acquainted with MaskJS',
                    description: '... and also its modules - Compo, Bindings, jMask',
                    time: 120,
                    complete: 10
                }, {
                    title: 'Give some feedback',
                    time: 5,
                    complete: 20,
                },{
                    title: 'Read IncludeJS docs',
                    time: 15
                });
        }
        
        var model = {
            tasks: tasks,
            timings: [
                5,
                15,
                30,
                60,
                120,
                300
            ]
        }
        
        window.app = Compo.initialize(App, model, document.body);
    });