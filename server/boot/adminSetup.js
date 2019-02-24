// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function(app) {
  var User = app.models.AppUser;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Team = app.models.Team;

  User.findOne({ email: "aaa@aaa.com" }, function(err, user) {
    if (err) throw err;

    console.log("found user:", user);

    // create project 1 and make john the owner

    //create the admin role
    Role.upsertWithWhere(
      {
        name: "admin"
      },
      {
        name: "admin"
      },
      function(err, role) {
        if (err) throw err;

        console.log("Created role:", role);

        //make bob an admin
        role.principals.destroyAll(function(err) {
          if (err) throw err;
          role.principals.create(
            {
              principalType: RoleMapping.USER,
              principalId: user.id
            },
            function(err, principal) {
              if (err) throw err;

              console.log("Created principal:", principal);
            }
          );
        });
      }
    );
  });
};
