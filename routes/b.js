var x =[  ]
console.log(x[0])
var y = 'SELECT * FROM public.course where "courseCode"='
if(x.length>0)
{
    for(var i= 0;i<x.length;i++)
    {
        if(i==x.length-1)
        {
            y += x[i]
        }
        else{
            y += x[i]
            y+= ' or "courseCode"='
    
        }
    }
}
else{
    y = ""
}

console.log(y)