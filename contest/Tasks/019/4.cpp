#include <bits/stdc++.h>

using namespace std;

string x, y;

int main() {
  freopen("inp.txt", "r", stdin);
  freopen("out.txt", "w", stdout);
  cin >> x >> y;
  int u = y.find(x);
  cout << (u + 1 > 0 ? u + 1 : -1 )<< endl;
  return 0;
}


