House Cup
=====================

A very simple Potter-ish house cup points tracker. Someone with the password can add or remove points (negative #), and anyone can view point totals.

Build with react-transform-boilerplate and Firebase

Firebase Format
=====================

Your Firebase data should be formatted in the following way:

```
root
	houseId
		name:"",
		points:#,
		members:[
			name:"",
			name:""
		]
	house2Id
		name:""
		...
```

And so on.
