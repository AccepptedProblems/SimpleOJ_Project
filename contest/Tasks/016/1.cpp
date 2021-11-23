#include <bits/stdc++.h>

using namespace std;

string s;
int n;

int main() {
  freopen("inp.txt", "r", stdin);
  freopen("out.txt", "w", stdout);
  cin >> s >> n;
  for (int i = 1; i <= n; i++) {
    int op;
    cin >> op;
    if (op == 1) {
      string x;
      int y;
      cin >> x >> y;
      s.insert(y, x);
    } else {
      int x, y;
      cin >> x >> y;
      s.erase(x - 1, y);
    }
    cout << s << endl;
  }
  return 0;
}
