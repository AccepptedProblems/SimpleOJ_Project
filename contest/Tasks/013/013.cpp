#include <bits/stdc++.h>

using namespace std;

const int N = 100010;

int n, m;
int a[N];

int main() {
  freopen("inp.txt", "r", stdin);
  freopen("out.txt", "w", stdout);
  scanf("%d %d", &n, &m);
  for (int i = 1; i <= n; i++) {
    int u;
    scanf("%d", &u);
    a[u]++;
    cout << a[u] << " ";
  }
  cerr << endl;
  return 0;
}
