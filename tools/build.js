
global.config = {
	
	// copy libraries for 'download' component
	'libs': [{
		action: 'copy',
		files: {
			'../../class/lib/class.js'			: '../public/libs/class/class.js',
			'../../class/lib/class.min.js'		: '../public/libs/class/class.min.js',
			
			'../../include/lib/include.js'		: '../public/libs/include/include.js',
			'../../include/lib/include.min.js'	: '../public/libs/include/include.min.js',
			
			'../../include/lib/include.node.js'	: '../public/libs/include/include.node.js',
			

			'../../mask/lib/mask.js'				: '../public/libs/mask/mask.js',
			'../../mask/lib/mask.min.js'			: '../public/libs/mask/mask.min.js',
			'../../mask/lib/mask.node.js'			: '../public/libs/mask/mask.node.js',
			'../../compos/layout/lib/layout.js'	: '../public/libs/mask/handlers/layout.js',
			
			'../../mask.animation/lib/mask.animation.js'		: '../public/libs/mask/mask.animation.js',
			'../../mask.animation/lib/mask.animation.min.js'	: '../public/libs/mask/mask.animation.min.js',
			
			'../../ruqq/lib/routes.js'	: '../public/libs/ruqq/routes.js',
			'../../ruqq/lib/arr.js'	: '../public/libs/ruqq/arr.js',
			'../../ruqq/lib/utils.js'	: '../public/libs/ruqq/utils.js',
		}
	},
	{
		action: 'custom',
		script: 'libs-minify'
	}
	],
	
	'defaults': ['libs']
};



