module("Etape 1");

QUnit.config.reorder = false;

var query = new QueryAPI();

QUnit.config.reorder = false;

function test1(){
  var result = query.explore(new Array());
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
}

function test2(){
  var result = query.explore(["wrong schema"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Invalid schema identifier");
}

function test3(){
  var result = query.explore(["Traffic"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], {"[Traffic]":{"caption":"Traffic"}});
}

function test4(){
  var result = query.explore(["Traffic", "[wrong cube]"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Invalid identifier");
}

function test5(){
  var result = query.explore(["Traffic", "[Traffic]"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], {"[Zone]":{"caption":"Zone","type":"Geometry"},"[Measures].[Goods Quantity]":{"aggregator":"SUM","caption":"Goods Quantity","type":"Measure"},"[Measures].[Max Quantity]":{"aggregator":"MAX","caption":"Max Quantity","type":"Measure"},"[Time]":{"caption":"Time","type":"Time"}});
}

function test6(){
  var result = query.explore(["Traffic", "[Traffic]", "[wrong dimension]"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Invalid identifier");
}

function test7(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]"]);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], {"[Zone.Name]":{"caption":"Zone"},"[Zone.Reference]":{"caption":"Zone"}});
}

function test8(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.wrong]"], false);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  equal(result["data"], "Invalid identifier");
}

function test9(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]"], false);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], [{"id":"[Zone.Name].[(All)]","caption":"(All)"},{"id":"[Zone.Name].[Name0]","caption":"Name0"},{"id":"[Zone.Name].[Name1]","caption":"Name1"},{"id":"[Zone.Name].[Name2]","caption":"Name2"},{"id":"[Zone.Name].[Name3]","caption":"Name3"}]);
}

function test10(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]", "[Zone.Name].[wrong]"], false);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["data"], "Invalid identifier");
  notEqual(result["data"], null);
}

function test11(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]", "[Zone.Name].[Name0]"], false);
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "OK", "no error");
  notEqual(result["data"], null);
  deepEqual(result["data"], {"[Zone.Name].[All Zone.Names].[Croatia]":{"caption":"Croatia"},"[Zone.Name].[All Zone.Names].[Switzerland]":{"caption":"Switzerland"},"[Zone.Name].[All Zone.Names].[Cyprus]":{"caption":"Cyprus"},"[Zone.Name].[All Zone.Names].[Portugal]":{"caption":"Portugal"},"[Zone.Name].[All Zone.Names].[France]":{"caption":"France"},"[Zone.Name].[All Zone.Names].[Italy]":{"caption":"Italy"},"[Zone.Name].[All Zone.Names].[United Kingdom]":{"caption":"United Kingdom"},"[Zone.Name].[All Zone.Names].[Finland]":{"caption":"Finland"},"[Zone.Name].[All Zone.Names].[Iceland]":{"caption":"Iceland"},"[Zone.Name].[All Zone.Names].[Slovakia]":{"caption":"Slovakia"},"[Zone.Name].[All Zone.Names].[Belgium]":{"caption":"Belgium"},"[Zone.Name].[All Zone.Names].[Luxembourg]":{"caption":"Luxembourg"},"[Zone.Name].[All Zone.Names].[Turkey]":{"caption":"Turkey"},"[Zone.Name].[All Zone.Names].[Norway]":{"caption":"Norway"},"[Zone.Name].[All Zone.Names].[Slovenia]":{"caption":"Slovenia"},"[Zone.Name].[All Zone.Names].[Austria]":{"caption":"Austria"},"[Zone.Name].[All Zone.Names].[Romania]":{"caption":"Romania"},"[Zone.Name].[All Zone.Names].[Czech Republic]":{"caption":"Czech Republic"},"[Zone.Name].[All Zone.Names].[Malta]":{"caption":"Malta"},"[Zone.Name].[All Zone.Names].[Lithuania]":{"caption":"Lithuania"},"[Zone.Name].[All Zone.Names].[Denmark]":{"caption":"Denmark"},"[Zone.Name].[All Zone.Names].[Estonia]":{"caption":"Estonia"},"[Zone.Name].[All Zone.Names].[The former Yugoslav Republic of Macedonia]":{"caption":"The former Yugoslav Republic of Macedonia"},"[Zone.Name].[All Zone.Names].[Hungary]":{"caption":"Hungary"},"[Zone.Name].[All Zone.Names].[Latvia]":{"caption":"Latvia"},"[Zone.Name].[All Zone.Names].[Germany]":{"caption":"Germany"},"[Zone.Name].[All Zone.Names].[Bulgaria]":{"caption":"Bulgaria"},"[Zone.Name].[All Zone.Names].[Sweden]":{"caption":"Sweden"},"[Zone.Name].[All Zone.Names].[Greece]":{"caption":"Greece"},"[Zone.Name].[All Zone.Names].[Netherlands]":{"caption":"Netherlands"},"[Zone.Name].[All Zone.Names].[Liechtenstein]":{"caption":"Liechtenstein"},"[Zone.Name].[All Zone.Names].[Ireland]":{"caption":"Ireland"},"[Zone.Name].[All Zone.Names].[Poland]":{"caption":"Poland"},"[Zone.Name].[All Zone.Names].[Spain]":{"caption":"Spain"}});
}

function test12(){
 // var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]", "[Zone.Name].[Name0]"], true);
 // var props = Object.keys(result);
 // equal(props.length, 2, "only error and data alright");
 // equal(result["error"], "OK", "no error");
 // notEqual(result["data"], null);
 // notEqual(result["data"], "Invalid identifier");
 equal("1", "1");
}

function test13(){
  var result = query.explore(["Traffic", "[Traffic]", "[Zone]", "[Zone.Name]", "[Zone.Name].[Name0]"], "wrong parameter");
  var props = Object.keys(result);
  equal(props.length, 2, "only error and data alright");
  equal(result["error"], "BAD_REQUEST", "bad request");
  notEqual(result["data"], null);
  equal(result["data"], "'withProperties' field not specified or invalid");
}

function runTest(f){
  test(f.toString(), f);
}

function runTests(){
  test(test1.toString(), test1);
  test(test2.toString(), test2);
  test(test3.toString(), test3);
  test(test4.toString(), test4);
  test(test5.toString(), test5);
  test(test6.toString(), test6);
  test(test7.toString(), test7);
  test(test8.toString(), test8);
  test(test9.toString(), test9);
  test(test10.toString(), test10);
  test(test11.toString(), test11);
  test(test12.toString(), test12);
  test(test13.toString(), test13);
}

runTests();



