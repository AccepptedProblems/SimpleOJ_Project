#include <bits/stdc++.h>

using namespace std;

const int N = 100010;

int n, m;
int a[N];

int main() {
  freopen("inp.txt", "r", stdin);
  freopen("out.txt", "w", stdout);
  scanf("%d %d", &n, &m);
  for (int i = 1; i <= m; i++) {
    int u;
    scanf("%d", &u);
    a[u] = 1;
  }
  vector <int> res;
  for (int i = 1; i <= n; i++) {
    if (!a[i]) {
      res.push_back(i);
    }
  }
  cout << res.size() << endl;
  for (int i : res) {
    cout << i << " ";
  }
  return 0;
}

