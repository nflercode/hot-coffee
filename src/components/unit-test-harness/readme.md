# Unit test harness

This component is usable for unit tests with jest/testinglibrary, it is able to set up a memory router and a redux store to help with testing..

## Usage
``` jsx
<UnitTestHarness 
    store={
        { potato: {
            color: 'purple'
            }
        }
    routes=[
        '/',
        '/my-slips-online'
    ]
}>
  {children}
</UnitTestHarness>
```

## Parameters

| Parmeter    | Description           | Type        |
| ----------- | ----------------------| ----------- |
| State       | State for redux store | Object
| Routes      | Array of urls         | Array   |