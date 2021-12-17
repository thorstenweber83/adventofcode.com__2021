with import <nixpkgs> { };

mkShell {
  buildInputs =
    let nodejs = nodejs-14_x;
    in
    [
      (nodePackages.npm.override { inherit nodejs; })
    ];

  shellHook = ''
    PATH+=":$(pwd)/node_modules/.bin"
    npm i
  '';
}
